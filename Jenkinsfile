pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "rajeshwar2473/cicd-app"
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