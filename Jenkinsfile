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
                    pip3 install --break-system-packages setuptools

                    echo "=== Verificando setuptools y pkg_resources ==="
                    python3 -c "import setuptools; print(setuptools.__version__); import pkg_resources; print('pkg_resources OK')"

                    echo "=== Ejecutando tests backend ==="
                    coverage run backend/manage.py test tests.backend

                    echo "=== Generando reporte de cobertura ==="
                    coverage xml
                '''
            }
        }
    }
}