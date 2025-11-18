# AWS Credentials Setup

## Method 1: Create IAM User (Recommended)

1. **Go to AWS Console → IAM → Users**
2. **Click "Create User"**
3. **User name:** `optimsp-demo-user`
4. **Attach policies:** `AmazonBedrockFullAccess` and `ComprehendFullAccess`
5. **Create access key → Application running outside AWS**
6. **Copy the credentials:**

```env
VITE_AWS_REGION=us-east-2
VITE_AWS_ACCESS_KEY_ID=AKIA...your_access_key
VITE_AWS_SECRET_ACCESS_KEY=your_secret_key
# No session token needed for IAM user
```

## Method 2: Use Your Current Credentials

Run in CloudShell:
```bash
aws configure list
```

Then use those credentials in .env:
```env
VITE_AWS_REGION=us-east-2
VITE_AWS_ACCESS_KEY_ID=your_current_access_key
VITE_AWS_SECRET_ACCESS_KEY=your_current_secret_key
# Remove session token line completely
```

## Step 3: Update .env file

Replace placeholder values with real credentials:

```env
VITE_AWS_REGION=us-east-2
VITE_AWS_ACCESS_KEY_ID=AKIA1234567890EXAMPLE
VITE_AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

## Step 4: Restart Dev Server

```bash
npm run dev
```

**Note:** Session tokens don't work for this use case. Use IAM user credentials instead.