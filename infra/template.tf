data "template_file" "user_data" {
  template = "${file("scripts/server-prod.sh.tpl")}"

  vars {
    USER = "ubuntu"
    PUBLIC_IP = "${aws_eip.public-ip.public_ip}"
    APP_DB_HOST = "${var.app-db-host}"
    APP_DB_SCHEMA = "${var.app-db-schema}"
    APP_DB_USER = "${var.app-db-user}"
    APP_DB_PASS = "${var.app-db-password}"
  }
}
