terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>3.0"
    }
  }
  required_version = ">= 0.14.9"
}

provider "azurerm" {
  features {}
}

resource "random_integer" "ri" {
  min = 10000
  max = 99999
}

resource "azurerm_resource_group" "rg" {
  name     = "rg-devops-todo-${random_integer.ri.result}"
  location = "eastus"
}

resource "azurerm_virtual_network" "vnet" {
  name                = "vnet-devops-todo-${random_integer.ri.result}"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
}

resource "azurerm_subnet" "subnet" {
  name                 = "subnet-devops-todo-${random_integer.ri.result}"
  resource_group_name  = azurerm_resource_group.rg.name
  virtual_network_name = azurerm_virtual_network.vnet.name
  address_prefixes     = ["10.0.1.0/24"]
}

resource "azurerm_key_vault" "kv" {
  name                        = "kv-devops-todo-${random_integer.ri.result}"
  location                    = azurerm_resource_group.rg.location
  resource_group_name         = azurerm_resource_group.rg.name
  tenant_id                   = data.azurerm_client_config.current.tenant_id
  sku_name                   = "standard"
  soft_delete_enabled         = true
  purge_protection_enabled    = false
}

resource "azurerm_key_vault_secret" "database_url" {
  name         = "DATABASE_URL"
  value        = var.database_url
  key_vault_id = azurerm_key_vault.kv.id
}

resource "azurerm_app_service_plan" "plan" {
  name                = "asp-devops-todo-${random_integer.ri.result}"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name

  sku {
    tier = "Basic"
    size = "B1"
  }

  kind = "Linux"
  reserved = true
}

resource "azurerm_linux_web_app" "app" {
  name                = "webapp-devops-todo-${random_integer.ri.result}"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  service_plan_id     = azurerm_app_service_plan.plan.id

  site_config {
    linux_fx_version = "NODE|18-lts" # Node 18 for Next.js
  }

  app_settings = {
    "DATABASE_URL" = var.database_url
    "WEBSITES_ENABLE_APP_SERVICE_STORAGE" = "false"
  }

  https_only = true

  connection_string {
    name  = "DefaultConnection"
    type  = "PostgreSQL"
    value = var.database_url
  }

  virtual_network_subnet_id = azurerm_subnet.subnet.id
}

resource "azurerm_application_insights" "insights" {
  name                = "appinsights-devops-todo-${random_integer.ri.result}"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  application_type    = "web"
}

data "azurerm_client_config" "current" {}

