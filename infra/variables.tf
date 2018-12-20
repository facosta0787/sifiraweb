variable "aws-access-key" {
  type = "string"
}

variable "aws-secret-key" {
  type = "string"
}

variable "aws-region" {
  type    = "string"
  default = "us-east-1"
}

variable "aws-ami" {
  type = "string"
}

variable "aws-instance-type" {
  type    = "string"
  default = "t2.micro"
}

variable "aws-ssh-key" {
  type = "string"
}

variable "app-db-host" {
  type = "string"
}

variable "app-db-schema" {
  type = "string"
}

variable "app-db-user" {
  type = "string"
}

variable "app-db-password" {
  type = "string"
}
