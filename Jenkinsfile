pipeline {
  agent any
 
  tools {
    nodejs "node"
  }
 
  stages {
    stage('Test') {
      steps {
        sh 'npm install'
        sh 'npm run build'
        sh 'npm run lint'
        sh 'npm test'
      }
    }
  }
}
