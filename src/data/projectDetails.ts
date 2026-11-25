export const projectDetails = {
  'vehicle-service-management': {
    overview: 'A full-stack platform that brings vehicle registration, service booking, customer interactions and service-centre operations into one connected workflow.',
    problem: 'Vehicle servicing involves multiple hand-offs: registering vehicles, booking service slots, assigning staff, tracking work and collecting payments. The application organizes these steps in a shared customer and operations platform.',
    implementation: ['Built customer-facing and administration workflows with React and a Node.js/Express API.', 'Connected MongoDB data models to vehicle, booking, service and payment records.', 'Integrated authentication, cloud media handling, online payments, map-based tracking and PDF receipt generation.'],
    gallery: [
      ['/projects/vehicle-service/01-registration.webp','Registration and OTP authentication'],
      ['/projects/vehicle-service/02-booking.webp','Service booking interface'],
      ['/projects/vehicle-service/03-tracking.webp','Vehicle tracking interface'],
      ['/projects/vehicle-service/04-payment.webp','Razorpay payment integration'],
      ['/projects/vehicle-service/05-receipt.webp','PDF service receipt'],
      ['/projects/vehicle-service/06-vehicle-dashboard.webp','Customer vehicle dashboard'],
      ['/projects/vehicle-service/07-admin-payments.webp','Administration payment dashboard']
    ],
    note: 'Application screenshots supplied for this portfolio. Payment and map views are demonstrations of the implemented integration workflows.'
  },
  'task-project-management': {
    overview: 'A MERN application for organizing projects and tasks, assigning work, setting priorities and monitoring progress from a centralized workspace.',
    problem: 'Project work can become difficult to follow when tasks, deadlines and progress are spread across separate tools. This application groups project-level and task-level work in one interface.',
    implementation: ['Created project and task management interfaces in React.', 'Implemented REST endpoints with Express and MongoDB persistence.', 'Added JWT-protected access, task status and priority handling, search and filtering.'],
    gallery: [
      ['/projects/task-management/01-dashboard.webp','Project and task overview dashboard'],
      ['/projects/task-management/02-projects.webp','Project management page'],
      ['/projects/task-management/03-tasks.webp','Task management page'],
      ['/projects/task-management/04-login.webp','Account login page'],
      ['/projects/task-management/05-registration.webp','Account registration page']
    ],
    note: 'Screenshots use demonstration records. Replace any sample account details with neutral data before publishing if they identify a real person.'
  },
  'resume-screening-ai-agent': {
    overview: 'A Streamlit-based screening tool that extracts information from resumes, compares candidate content with a job description and ranks matches using keyword and semantic similarity.',
    problem: 'Reviewing a large set of resumes against a role description can be repetitive. This prototype explores how text extraction and similarity scoring can help organize an initial review.',
    implementation: ['Supports PDF, DOCX and TXT resume inputs.', 'Uses keyword matching and Sentence Transformers semantic similarity to compare resume content with a job description.', 'Applies configurable weighted scoring and presents ranked results with CSV export.'],
    gallery: [
      ['/projects/resume-screening/01-upload.webp','Resume screening interface'],
      ['/projects/resume-screening/02-job-description.webp','Job description input'],
      ['/projects/resume-screening/03-job-description.webp','Job description preview'],
      ['/projects/resume-screening/04-ranked-results.webp','Ranked candidate results'],
      ['/projects/resume-screening/05-screening-results.webp','Screening results table'],
      ['/projects/resume-screening/06-export-data.webp','Exported screening data']
    ],
    note: 'This is a screening aid, not an autonomous hiring system. Results require human review; no validated accuracy percentage is claimed.'
  },
  'stock-market-analysis': {
    overview: 'A Python desktop application for exploring historical stock-market data through price charts, moving averages, return analysis and correlation visualizations.',
    problem: 'Raw historical price series are difficult to compare directly. The project presents common analytical views that help inspect trends and relationships in market data.',
    implementation: ['Used yfinance to retrieve historical market data.', 'Processed price and return series with Pandas and NumPy.', 'Visualized closing prices, 50-day and 200-day moving averages, daily returns and correlation using Matplotlib and Seaborn.'],
    gallery: [
      ['/projects/stock-market-analysis/01-interface.webp','Desktop application interface'],
      ['/projects/stock-market-analysis/02-data-input.webp','Stock symbol and date-range input'],
      ['/projects/stock-market-analysis/03-price-trend.webp','Historical closing-price trend'],
      ['/projects/stock-market-analysis/04-moving-average.webp','Moving-average visualization'],
      ['/projects/stock-market-analysis/05-returns.webp','Daily returns visualization'],
      ['/projects/stock-market-analysis/06-correlation.webp','Correlation heatmap']
    ],
    note: 'The supplied analysis uses historical data (2011–2021); it is not a live market-tracking or investment-advisory tool.'
  }
} as const;
