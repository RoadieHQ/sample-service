pipeline {
  agent any
 
  tools {
    nodejs "node"
  }
 
  stages {
    stage('Test') {
      steps {
        sh 'yarn run lint'
        sh 'yarn test'
      }
    }
  }
}
