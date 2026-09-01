# ReportPortal Test Automation Framework (TAF)

[![Playwright Tests](https://github.com/KukaszProject/report-portal-ts-taf/actions/workflows/playwright.yml/badge.svg)](https://github.com/KukaszProject/report-portal-ts-taf/actions)

This repository contains a robust, enterprise-grade Test Automation Framework built with **Playwright** and **TypeScript** for testing the ReportPortal application.

## 🏗️ Architecture

This framework strictly follows a **3-Tier Layered Architecture** to ensure maintainability, scalability, and clean code:

1. **1️⃣ Core Layer (`src/core`)**: The engine. Contains centralized configurations, custom Playwright fixtures, Winston logging, and base wrappers. It abstracts the low-level Playwright API.
2. **2️⃣ Business Layer (`src/business`)**: The domain. Contains Page Object Models (POMs), API Client Services, Data Builders (using Faker.js), and DTOs.
3. **3️⃣ Tests Layer (`tests/`)**: The execution. Contains UI, API, and Hybrid specifications written in plain English using `test.step()`.

## 🚀 Key Features

* **Global Authentication Setup**: Bypasses the UI login screen by injecting auth tokens directly into the browser state, saving massive execution time.
* **Hybrid Testing**: Utilizes API requests to instantly Arrange and Teardown test data, using the UI only for the Act and Assert phases.
* **Pure API Testing**: Includes a dedicated API layer for validating backend schemas and status codes headless-ly.
* **Robust Synchronization**: Explicitly waits for SPA hydration and elements rather than using arbitrary timeouts.
* **Allure Reporting**: Generates comprehensive HTML execution reports.

## 💻 Local Setup

1. **Clone the repository and install dependencies:**
   ```bash
   git clone <repository-url>
   cd report-portal-taf
   npm install
   npx playwright install chromium