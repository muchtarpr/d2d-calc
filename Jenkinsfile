def main_proj = "micro"						                        /* project name */
def sub_proj = "gue-web-micro"					                    /* project name */
def http_req = false							                    /* for step check with http req */
def hostname_dev = ""		                                        /* address for this proj */
def hostname_prod = ""		                                        /* address for this proj */
def keep_img = 5 								                    /* number of images that remain stored (dev only)*/
def repo_name = repoName()
def branch = env.BRANCH_NAME
(tag, tag_now, tag_old) = curBranch(branch, keep_img)
def project = "$main_proj/$sub_proj"
def source_folder = "$SOURCE_PATH_G2-$project/$tag"
def image_repo = "$REGISTRY/$project"
def k8s_deployment = "$sub_proj-$tag"
def namespace = "gue-g2-$main_proj"
def job = "Job             : $env.JOB_NAME #$env.BUILD_ID\r\n"
def source = "Source      : $repo_name/$env.BRANCH_NAME\r\n"
def cur_stage = "\r\n"
def time = 30
def message


String repoName() {
	return scm.getUserRemoteConfigs()[0].getUrl().tokenize('/').last().split("\\.")[0]
}

String jobDuration() {
	return "Duration  : $currentBuild.durationString\r\n"
}

def curBranch(branch, keep_img) {
	def now = new Date()
	def tag, tag_now, tag_old
	switch(branch) {
		case "master":
		case "hotfix":
			tag = "prod"
			tag_now = now.format("yyyyMMdd_HH_mm")
			tag_old = ""
		break
		default:
			tag = "dev" 
			tag_now = env.BUILD_ID
			tag_old = tag_now.toInteger() - keep_img
		break
	}
	return [tag, tag_now, tag_old]
}

def delOldImage(image_repo, tag_old) {
	def arrayTag
	String tagList = sshRemote("sudo docker images | grep '$image_repo' | tr -s ' ' | cut -d ' ' -f 2 | grep [0-9] | grep -v '_' || echo ''").trim()
	arrayTag = tagList.tokenize('\r\n')
	if (arrayTag) {
		for (element in arrayTag) {
			def del_tag = element.toInteger()
			if(del_tag < tag_old) {
				try {
					println("will delete image $image_repo:" + del_tag)
					sshRemote("docker rmi $image_repo:$del_tag") 
				}catch (err) { echo err.getMessage() }
			}
		}
	}
}

def sshRemote(command, check=false) {
	def remote = [:]

    remote.name = "k8s_dev_goagpos_m1"
    remote.host = "$K8S_DEV_GOAPOS_M1"
    credentials_id = "k8s-dev-goagpos-m1"
	
    remote.allowAnyHosts = true
    withCredentials([usernamePassword(credentialsId: "$credentials_id", usernameVariable: 'user', passwordVariable: 'password')]) {
    	remote.user = user
        remote.password = password
    	if (!check) { commandResult = sshCommand remote: remote, command: command }
    	if (check) { commandResult = sshCommand remote: remote, command: "$command >/dev/null 2>&1 && echo success || echo failed" }
    }

	if(commandResult == "failed"){
	    println "this build suposed to be fail"
        error("Build failed because of $command")
        sh "exit 1"
		return
	}
	return commandResult
}

def sendTelegram(message) {
	def encodedMessage = URLEncoder.encode(message, "UTF-8")
	withCredentials([string(credentialsId: 'telegramToken', variable: 'token'),
	string(credentialsId: 'telegramChatIdJenkins', variable: 'chat_id')]) {
		response = httpRequest (consoleLogResponseBody: false,
				contentType: 'APPLICATION_JSON',
				httpMode: 'GET',
				url: "https://api.telegram.org/bot$token/sendMessage?text=$encodedMessage&chat_id=$chat_id&disable_web_page_preview=true",
				validResponseCodes: '200')
		return response.status
	}
}


pipeline {
	agent any
	stages {
		stage('Check Folder') {
			steps {
				script {
					message = "BUILD START\r\n" + "$job" + "$source" 
					cur_stage = 'Check Folder\r\n'
					sendTelegram(message)
					sh "test -d $source_folder && echo $source_folder Folder Exists || mkdir -p $source_folder && chown -R 1000:1000 $source_folder && chmod -R 775 $source_folder"
				}
			}
		}
		stage('Preparation') {
			steps {
				script {
					cur_stage = 'Preparation\r\n'
					ws("$source_folder"){
						checkout scm
						sh "cp $SOURCE_PATH_G2-$main_proj/env/$sub_proj-$tag $source_folder/.env"
					}
				}
			}
		}
		stage('Build Image') {
			steps {
				script {
					cur_stage = 'Build Image\r\n'
					sshRemote("docker build -t $project $source_folder/.")
					sh "rm $source_folder/.env"
				}
			}
		}
		stage('Push Image') {
			steps {
				script {
					cur_stage = 'Push Image\r\n'
					/* Push image with tag*/
					sshRemote("docker tag $project $image_repo:$tag")
					sshRemote("docker push $image_repo:$tag")

					/* Push image with tag now*/
					sshRemote("docker tag $project $image_repo:$tag_now")
					sshRemote("docker push $image_repo:$tag_now")

					sshRemote("docker rmi $project")
					if (tag == "dev") {
						delOldImage(image_repo,tag_old) /* Delete old image with certain range*/
					}
				}
			}
		}
		stage('Deploy to K8s') {
			steps {
				script {
					cur_stage = 'Deploy to K8s\r\n'
						sshRemote("kubectl set image deployment/$k8s_deployment $k8s_deployment=$image_repo:$tag_now -n $namespace")
				}
			}
		}
		stage('Result') {
			steps {
				script {
					cur_stage = 'Result\r\n'
					if(http_req){
					    def address
                    	sleep time
						if (tag == "dev") { address = hostname_dev }
						if (tag == "prod") { address = hostname_prod}
						def response = httpRequest (consoleLogResponseBody: false,
                		    contentType: 'APPLICATION_JSON',
                			httpMode: 'GET',
                			url: "$address",
                			validResponseCodes: '200')
					}
				}
			}
		}
	}
	post { 
		success {
			script {
				message = "BUILD SUCCESS\r\n" + "$job" + "$source" + jobDuration()
				sendTelegram(message)
			}
		}
		failure {
			script {
				fail_stage = "Stage Fail : $cur_stage"
				message = "BUILD FAILURE\r\n" + "$job" + "$fail_stage" + "$source" + jobDuration() + "Please check $env.BUILD_URL"
				sendTelegram(message)
			}
		}
	}
}
