# Solana Security Dashboard 🛡️

A real-time security monitoring dashboard for tracking exploits and vulnerabilities in the Solana ecosystem.

## Features ✨

- 🔴 Live Alert System: Real-time notifications for ongoing security incidents
- 📊 Comprehensive Dashboard: Track total exploits, funds lost, and latest hacks
- 🕒 Historical Data: View and analyze past security incidents
- 💫 Modern UI: Built with Next.js 15 and Tailwind CSS for a beautiful user experience
- 🌓 Dark/Light Mode: Supports both dark and light themes
- 📱 Responsive Design: Works seamlessly across all devices

## Tech Stack 🛠️

- **Framework**: [Next.js 15](https://nextjs.org/)
- **UI Components**: 
  - [Radix UI](https://www.radix-ui.com/)
  - [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Charts**: [Recharts](https://recharts.org/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **Blockchain Integration**: [@solana/web3.js](https://solana-labs.github.io/solana-web3.js/)
- **Type Safety**: [TypeScript](https://www.typescriptlang.org/)

## Getting Started 🚀

1. **Clone the repository**
   ```bash
   git clone https://github.com/harshdev2909/Superteam-Security-Dashboard.git
   cd solana-security-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author ✍️

Built by [Harsh Sharma](https://github.com/harshdev2909)

## Acknowledgments 🙏

- Thanks to the Solana community for their support
- Built as part of the Superteam initiative

---

## Backend API Documentation 🔗

The backend API is deployed at: [https://superteam-security-dashboard-backend.onrender.com](https://superteam-security-dashboard-backend.onrender.com)

Backend Source Code: [GitHub Repository](https://github.com/harshdev2909/Superteam-Security-Dashboard-backend)

### 🗂️ Database Schema

The database schema includes the following models:

- **Exploit**: Stores information about blockchain exploits
- **Analytics**: Stores aggregated analytics data
- **Resource**: Stores educational resources
- **Contribution**: Stores user-submitted contributions
- **Alert**: Stores live alerts for suspicious activities

### 🚀 API Endpoints

#### 🔍 Exploits
- `GET /exploits`: Fetch a list of exploits with optional filters (date, protocol, type)
- `GET /exploits/:id`: Fetch a single exploit by ID
- `POST /exploits`: Create a new exploit (admin use)

#### 📊 Analytics
- `GET /analytics`: Fetch aggregated analytics data (total exploits, funds lost, response time)

#### 🙌 Contributions
- `GET /contributions`: Fetch all contributions with optional status filters
- `GET /contributions/:id`: Fetch a single contribution by ID
- `POST /contributions`: Submit a new contribution

#### 📚 Resources
- `GET /resources`: Fetch all resources
- `POST /resources`: Add a new resource

#### 📡 Live Tracker
- `WebSocket /api/live-tracker`: Provides real-time alerts for suspicious activities

---

⭐ Star this repo if you find it helpful!
