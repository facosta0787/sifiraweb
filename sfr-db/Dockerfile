FROM microsoft/mssql-server-linux:latest

ENV ACCEPT_EULA Y
ENV TZ America/Bogota

RUN apt update && apt install -y tzdata
RUN echo "America/Bogota" > /etc/timezone &&  \
dpkg-reconfigure -f noninteractive tzdata

EXPOSE 1433

CMD /opt/mssql/bin/sqlservr
