output "webapp_url" {
  description = "URL of the Azure Linux Web App"
  value       = "https://${azurerm_linux_web_app.app.name}.azurewebsites.net"
}

