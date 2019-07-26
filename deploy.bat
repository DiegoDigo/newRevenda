@ECHO OFF
IF %1.==. GOTO No1

GOTO deploy

:No1
  ECHO Digite a versao.
  EXIT

:deploy
    ECHO criando imagem.
    call docker build -t digodiego/web-revenda:%1 .
    call docker build -t digodiego/web-revenda:latest .
    ECHO Upload da imagem para o dockerhub.
    call docker login -u digodiego -p @mesma1012
    call docker push digodiego/web-revenda:%1
    call docker push digodiego/web-revenda:latest
