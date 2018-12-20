resource "aws_instance" "server-inst" {
  ami                    = "${var.aws-ami}"
  instance_type          = "${var.aws-instance-type}"
  key_name               = "${var.aws-ssh-key}"
  vpc_security_group_ids = ["${aws_security_group.sgp-sifira.id}"]

  lifecycle {
    create_before_destroy = true
  }

  user_data = "${data.template_file.user_data.rendered}"

  tags {
    Name = "sifiraweb-resources"
  }
}
