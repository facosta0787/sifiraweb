output "public-ip" {
  value = aws_eip.public-ip.public_ip
}

output "provisioner-script" {
  value = data.template_file.user_data.rendered
}
