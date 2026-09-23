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

        stage('Backend Tests') {
            steps {
                sh '''
                    echo "=== Instalando dependencias backend ==="
                    pip3 install --break-system-packages -r backend/requirements.txt
                    pip3 install --break-system-packages "setuptools<81"

                    echo "=== Ejecutando tests backend ==="
                    coverage run backend/manage.py test tests.backend

                    echo "=== Generando reporte de cobertura backend ==="
                    coverage xml
                '''
            }
        }

        stage('Frontend Tests') {
            steps {
                sh '''
                    echo "=== Instalando dependencias frontend ==="
                    docker run --rm \
                        --volumes-from jenkins \
                        -w "$WORKSPACE/frontend" \
                        node:22-alpine \
                        npm install

                    echo "=== Ejecutando tests frontend ==="
                    docker run --rm \
                        --volumes-from jenkins \
                        -w "$WORKSPACE/frontend" \
                        node:22-alpine \
                        npm run test:coverage
                '''
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'SonarScanner'

                    withSonarQubeEnv('SonarQube') {
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                    docker build -t reservas-gimnasio-udem-backend:latest ./backend
                '''
            }
        }
    }
}