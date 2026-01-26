# 🚀 Deployment Guide

## Local Development

### Start All Services

**Terminal 1 - Backend**
```bash
cd backend
npm install
npm run seed  # First time only
npm run dev   # Runs on port 4000
```

**Terminal 2 - Frontend**
```bash
cd frontend
npm install
npm run dev   # Runs on port 5173
```

Then open: `http://localhost:5173`

## Docker Deployment (Recommended)

### Prerequisites
- Docker and Docker Compose installed

### Run with Docker
```bash
docker-compose up --build
```

Services will be available at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`
- MongoDB: `localhost:27017`

### Stop Services
```bash
docker-compose down
```

## Cloud Deployment

### Option 1: Vercel (Frontend) + Railway (Backend)

#### Frontend on Vercel
1. Push code to GitHub
2. Connect repo to Vercel at https://vercel.com
3. Set environment variable: `VITE_API_BASE=https://your-backend.railway.app/api`
4. Deploy automatically on push

#### Backend on Railway
1. Connect GitHub repo to Railway
2. Create MongoDB plugin
3. Set environment variables:
   - `MONGODB_URI`: Auto-filled by Railway
   - `JWT_SECRET`: Set to strong value
   - `PORT`: 4000
4. Deploy

### Option 2: Heroku

#### Prerequisites
```bash
npm install -g heroku
heroku login
```

#### Deploy Backend
```bash
cd backend
heroku create your-app-name
heroku addons:create mongolab:sandbox
git push heroku main
```

#### Deploy Frontend
```bash
cd frontend
vercel deploy
```

### Option 3: AWS EC2 + S3 + RDS

1. **RDS**: Create MongoDB instance
2. **EC2**: Deploy Node backend
   - Install Node, npm
   - Clone repo, npm install
   - Use PM2 for process management
   - Set environment variables
3. **S3**: Upload built frontend
4. **CloudFront**: CDN for frontend

## Production Checklist

- [ ] Update CORS origins in backend (not `*`)
- [ ] Use strong `JWT_SECRET`
- [ ] Enable HTTPS/SSL
- [ ] Set up environment variables securely
- [ ] Configure database backups
- [ ] Enable logging and monitoring
- [ ] Set up error tracking (e.g., Sentry)
- [ ] Configure rate limiting
- [ ] Use strong database passwords
- [ ] Enable database authentication
- [ ] Set up automated tests
- [ ] Configure CI/CD pipeline

## Environment Variables

### Backend Production
```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/pft
JWT_SECRET=your_super_strong_secret_32_chars_min
PORT=4000
NODE_ENV=production
```

### Frontend Production
```env
VITE_API_BASE=https://your-api-domain.com/api
```

## Monitoring & Logging

### Backend Logs
```bash
# View PM2 logs
pm2 logs

# View Docker logs
docker-compose logs backend -f
```

### Database Monitoring
- MongoDB Atlas: Built-in monitoring
- Self-hosted: Use MongoDB Ops Manager or prometheus

### Performance
- Set up New Relic or DataDog
- Monitor API response times
- Track error rates

## Backup Strategy

### Database Backups
```bash
# MongoDB Atlas - Automatic (free tier: weekly)
# Self-hosted MongoDB
mongodump --uri "mongodb://localhost:27017/pft" --out /backups/
```

### Automated Backups
- Set cron job for weekly backups
- Store in AWS S3 or similar
- Test restore procedures monthly

## Scaling

### Vertical Scaling
- Increase server resources (CPU, RAM)
- Upgrade database instance

### Horizontal Scaling
- Load balancer (Nginx, AWS LB)
- Multiple backend instances
- MongoDB replication set
- Redis for caching

## Performance Optimization

### Frontend
```bash
# Build optimization
npm run build

# Analyze bundle
npm install -g webpack-bundle-analyzer
```

### Backend
- Add indexing to database queries ✓ (Already done)
- Implement caching (Redis)
- Use CDN for static assets
- Implement request compression

### Database
- Regular indexing review
- Query optimization
- Connection pooling

## Troubleshooting Deployment

| Issue | Solution |
|-------|----------|
| 502 Bad Gateway | Check backend server is running |
| CORS errors | Verify frontend and backend URLs match |
| Database connection failed | Check MONGODB_URI and firewall rules |
| Static assets 404 | Verify frontend build output |
| Slow performance | Check database indices, enable caching |

## Rollback Strategy

```bash
# Git rollback
git revert <commit-hash>
git push

# Docker rollback
docker-compose pull
docker-compose up --build
```

## Security Hardening

### Backend
```javascript
// Add helmet for security headers
const helmet = require('helmet');
app.use(helmet());

// Add rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);
```

### Frontend
- Use HTTPS only
- Set CSP headers
- Sanitize user inputs
- Use secure cookies

## Maintenance

### Regular Tasks
- [ ] Review and update dependencies (monthly)
- [ ] Check for security vulnerabilities (weekly)
- [ ] Monitor storage usage (weekly)
- [ ] Review error logs (daily)
- [ ] Test backup restoration (monthly)
- [ ] Update SSL certificates (quarterly)

---

**Last Updated**: January 26, 2026
