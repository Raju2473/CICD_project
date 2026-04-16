
pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "rajeshwar2473/cicd1-app"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git 'https://github.com/Raju2473/CICD_project.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}:latest")
                }
            }
        }

        stage('Docker Login & Push') {
            steps {
                script {
                    withDockerRegistry(
                        credentialsId: 'dockerhub-credentials',
                        url: 'https://index.docker.io/v1/'
                    ) {
                        docker.image("${DOCKER_IMAGE}:latest").push()
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                kubectl apply -f k8s/deployment.yaml
                kubectl apply -f k8s/service.yaml
                '''
            }
        }
    }
}
=======
pipeline {
    agent any

    environment {
        IMAGE_NAME = "rajeshwar2473/cicd1-app"
        DOCKER_CREDS = credentials('dockerhub-credentials')
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Raju2473/CICD_project.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                docker build -t $IMAGE_NAME:${BUILD_NUMBER} .
                docker tag $IMAGE_NAME:${BUILD_NUMBER} $IMAGE_NAME:latest
                '''
            }
        }

        stage('Docker Login') {
            steps {
                sh '''
                echo $DOCKER_CREDS_PSW | docker login \
                  -u $DOCKER_CREDS_USR --password-stdin
                '''
            }
        }

        stage('Push Image to Docker Hub') {
            steps {
                sh '''
                docker push $IMAGE_NAME:${BUILD_NUMBER}
                docker push $IMAGE_NAME:latest
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            when {
                expression { fileExists('k8s/deployment.yaml') }
            }
            steps {
                sh '''
                kubectl apply -f k8s/deployment.yaml
                kubectl apply -f k8s/service.yaml
                '''
            }
        }
    }

    post {
        success {
            echo "✅ CI/CD Pipeline completed successfully"
        }
        failure {
            echo "❌ CI/CD Pipeline failed"
        }
    }
}


give me update one
