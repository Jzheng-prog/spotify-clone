# Full Stack Spotify Clone

## Overview

This project is a full-stack music streaming application that replicates popular features and functionalities of Spotify. Developed using **Next.js 13.4**, **React**, **Tailwind CSS**, **Supabase**, **PostgreSQL**, and **Stripe**, this application showcases modern web development techniques and best practices.
<img src=https://github.com/user-attachments/assets/ed3532fc-819b-42dd-9eeb-1ca9cd5ca33e/>

## Features

- **Responsive Design**: A sleek user interface that adapts to all devices.
- **Song Upload**: Users can upload and play their favorite songs.
- **Advanced Player**: Includes a favorites system and playlists for easy song management.
- **Stripe Integration**: Enables premium subscriptions with secure payment processing.
- **Authentication**: User registration and login using Supabase authentication and GitHub OAuth.
- **File and Image Upload**: Utilize Supabase storage for handling media files.
- **Client Form Validation**: Implemented with React Hook Form for user-friendly input handling.
- **Error Handling**: Display server errors using React Toast notifications.
- **Real-Time Data Handling**: Fetch data directly in server components without traditional API calls.

## Tech Stack

- **Frontend**: Next.js 13.4, React, Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Payment Processing**: Stripe

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)
- Supabase account
- Stripe account

### Installation

1. Clone the repository
2. Make sure to have stripe and and supabase integrated with api keys and secret. Supabase will pause if the database isn't active for a period a time. Make sure to unpuase it if so. Webhooks for stripe need to be updated accordingly for every "stripe login"
3. npm run dev

