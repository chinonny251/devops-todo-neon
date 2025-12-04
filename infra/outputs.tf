output "webapp_url" {
  description = "URL of the Azure Linux Web App"
  value       = azurerm_linux_web_app.app.default_site_hostname
}
