resource "aws_eip" "public-ip" {}

resource "aws_eip_association" "eip-assoc" {
  instance_id   = aws_instance.server-inst.id
  allocation_id = aws_eip.public-ip.id
}