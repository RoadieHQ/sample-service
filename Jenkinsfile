pipeline {
  agent any
 
  tools {
    nodejs "node"
  }
 
  stages {
    stage('Test') {
      steps {
        sh 'npm run lint'
        sh 'npm test'
      }
    }
  }
}
