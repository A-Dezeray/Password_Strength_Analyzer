# Password Strength Analyzer

A JavaScript-based tool that analyzes password strength in real-time and provides actionable security recommendations.

## Features

- **Real-time Analysis**: Instant feedback as you type
- **Multiple Criteria Checking**:
  - Length requirements (minimum 8 characters)
  - Uppercase and lowercase letters
  - Numbers
  - Symbols
  - Repeated or predictable patterns
  - Common weak password structures
- **Strength Ratings**: Weak, Average, Strong, Very Strong
- **Security Suggestions**: Clear, actionable recommendations for improvement
- **User-Friendly Interface**: Clean, accessible design with password visibility toggle

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- Regular Expressions (Regex) for pattern detection

## How It Works

The analyzer evaluates passwords against multiple security criteria:

1. Checks for basic requirements (length, character types)
2. Detects repeated patterns (e.g., "aaa", "123", "abc")
3. Identifies common weak passwords (e.g., "password", "admin")
4. Calculates an overall strength score
5. Provides specific suggestions for improvement

## Local Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/A-Dezeray/Password_Strength_Analyzer.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Password_Strength_Analyzer
   ```

3. Open `index.html` in your web browser

No build process or dependencies required!

## What I Learned

This project helped me develop skills in:

- JavaScript conditionals and logical operators
- Regular expressions for pattern matching
- DOM manipulation and event handling
- User experience design principles
- Cybersecurity best practices
- Real-time input validation

## Security Note

This tool is designed for educational purposes and provides client-side password analysis. For production applications, always implement server-side validation and follow industry-standard security practices.

## Contributing

Feel free to fork this project and submit pull requests with improvements!

## License

MIT License - feel free to use this project for learning and development.

---

Built as part of my journey to reinforce JavaScript fundamentals and cybersecurity awareness.
