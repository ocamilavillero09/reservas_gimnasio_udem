pipeline {
    agent any

    stages {

        stage('Verify Environment') {
            steps {
                sh '''
                    echo "=== Python ==="
                    python3 --version

                    echo "=== Java ==="
                    java -version

                    echo "=== Docker ==="
                    docker --version

                    echo "=== Node 22 ==="
                    docker run --rm node:22-alpine node --version
                '''
            }
        }
    }
}