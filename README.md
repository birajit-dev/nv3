# Northeast Herald - News Website

A professional news website built with Next.js 15, designed to look like "The Hindu" with clean, serious, and SEO-friendly design. This is a complete news platform for Northeast India with comprehensive features including category pages, article management, video content, photo galleries, and advertisement support.

## 🚀 Features

### Core Features
- **Professional Design**: Clean, serious design inspired by The Hindu newspaper
- **SEO-Optimized**: Dynamic meta tags, sitemap.xml, robots.txt, and JSON-LD schema
- **Responsive**: Mobile-first design with Tailwind CSS
- **Performance**: Optimized with Next.js 15 App Router, ISR/SSR
- **Accessibility**: WCAG compliant with proper focus management

### Content Management
- **Categories**: Top News, Tripura, National, International, Sports, Finance, Articles, Videos, Gallery, Others
- **Article Pages**: Full article view with SEO schema, breadcrumbs, and social sharing
- **Featured Content**: Hero sections and featured article layouts
- **Related Content**: Automatic related article suggestions

### Special Pages
- **Videos**: YouTube integration with video player interface
- **Gallery**: Photo gallery with lightbox functionality
- **About & Contact**: Professional company pages with contact forms
- **Author Pages**: Author profiles and article listings

### Advertisement Support
- **Multiple Ad Formats**: Sidebar, horizontal, square, and mobile ads
- **Google AdSense Ready**: Pre-configured ad slots and responsive ad units
- **Custom Ad Management**: Built-in ad banner component system

### Technical Features
- **API Integration**: Fetches content from `https://app.neherald.com/api/next/v1`
- **Fallback System**: Dummy data for development and testing
- **Google Analytics**: Pre-configured analytics integration
- **Social Media**: Integrated sharing and social media links

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS 4
- **Typography**: Inter font family
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Image Optimization**: next/image
- **SEO**: Built-in Next.js metadata API

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd nheraldweb
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SITE_URL=https://neherald.com
   NEXT_PUBLIC_API_URL=https://app.neherald.com/api/next/v1
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Visit [https://neherald.com](https://neherald.com)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── [category]/        # Dynamic category pages
│   ├── news/[slug]/       # Individual article pages
│   ├── videos/            # Video content page
│   ├── gallery/           # Photo gallery page
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── layout.tsx         # Root layout with SEO
│   ├── page.tsx           # Homepage
│   ├── sitemap.ts         # Dynamic sitemap generation
│   └── robots.ts          # SEO robots.txt
├── components/
│   ├── ui/                # Reusable UI components
│   │   ├── NewsCard.tsx
│   │   ├── FeaturedNewsCard.tsx
│   │   └── AdBanner.tsx
│   └── layout/            # Layout components
│       ├── Header.tsx
│       └── Footer.tsx
├── lib/                   # Utility functions
│   ├── api.ts            # API functions and dummy data
│   ├── seo.ts            # SEO utilities and metadata generation
│   └── categories.ts     # Category definitions and utilities
├── types/
│   └── news.ts           # TypeScript type definitions
└── globals.css           # Global styles and custom CSS
```

## 🎨 Design Features

### Homepage Layout
- **Hero Section**: Featured story with large image overlay
- **Top Stories**: Grid layout with featured and regular articles
- **Sidebar**: Latest news, trending topics, ads, and newsletter signup
- **Responsive Grid**: Adapts from 1 to 4 columns based on screen size

### Article Page Layout
- **Breadcrumb Navigation**: SEO-friendly navigation trail
- **Article Header**: Title, excerpt, author info, and metadata
- **Featured Image**: Optimized images with proper alt text
- **Content**: Properly formatted article content with typography
- **Sidebar**: Related articles, ads, and social sharing
- **Author Box**: Author information and bio

### Category Pages
- **Category Header**: Category name, description, and filters
- **Featured Articles**: Highlighted content for each category
- **Article Grid**: Responsive grid with pagination
- **Sidebar**: Category-specific content and ads

## 🔧 Configuration

### API Configuration
The website is designed to work with a backend API at `https://app.neherald.com/api/next/v1`. The frontend is deployed at `https://neherald.com`.

### SEO Configuration
- Update `src/lib/seo.ts` with your site details
- Modify `src/app/layout.tsx` for global SEO settings
- Configure Google Analytics ID in the layout

### Advertisement Configuration
- Customize ad placements in `src/components/ui/AdBanner.tsx`
- Add your Google AdSense publisher ID
- Configure ad sizes and placements

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The website can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- Email: neherald.com@gmail.com
- Website: [Northeast Herald](https://neherald.com)

## 🙏 Acknowledgments

- Design inspiration from The Hindu newspaper
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Lucide for the beautiful icons