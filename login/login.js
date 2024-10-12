// Dummy user data store
const users = {};

// OTP Generation and sending simulation
function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const showLoginButton = document.getElementById('showLogin');
    const showRegisterButton = document.getElementById('showRegister');
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const messageElement = document.getElementById('message');
    const loginMessageElement = document.getElementById('loginMessage');
    const getOtpBtn = document.getElementById('getOtpBtn');

    // Toggle between Login and Register forms
    if (showLoginButton) {
        showLoginButton.addEventListener('click', function(event) {
            event.preventDefault();
            registerForm.style.display = 'none';
            loginForm.style.display = 'block';
        });
    }

    if (showRegisterButton) {
        showRegisterButton.addEventListener('click', function(event) {
            event.preventDefault();
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
        });
    }

    // Register Form Handling
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm_password').value;
            const otp = document.getElementById('otp').value;
            const storedOtp = sessionStorage.getItem('otp');

            if (users[email]) {
                messageElement.innerText = 'Email already registered.';
                return;
            }

            if (password !== confirmPassword) {
                messageElement.innerText = 'Passwords do not match.';
                return;
            }

            if (otp === storedOtp) {
                users[email] = password;
                messageElement.innerText = 'Registration successful. Please login.';
                sessionStorage.removeItem('otp');
                setTimeout(() => {
                    registerForm.style.display = 'none';
                    loginForm.style.display = 'block';
                }, 2000);
            } else {
                messageElement.innerText = 'Invalid OTP.';
            }
        });
    }

    // OTP Generation
    if (getOtpBtn) {
        getOtpBtn.addEventListener('click', function() {
            const email = document.getElementById('email').value;

            if (!email) {
                messageElement.innerText = 'Please enter your email first.';
                return;
            }

            const otp = generateOtp();
            sessionStorage.setItem('otp', otp);
            alert(`OTP sent to ${email}: ${otp}`); // Simulate sending OTP
            messageElement.innerText = 'OTP has been sent to your email.';
        });
    }

    

    // Login Form Handling
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const email = document.getElementById('login_email').value;
            const password = document.getElementById('login_password').value;

            if (users[email] && users[email] === password) {
                loginMessageElement.innerText = 'Login successful!';
                setTimeout(() => window.location.href = "./captureData/data.html", 0);
            } else {
                loginMessageElement.innerText = 'Incorrect email or password.';
            }
        });
    }

    // Initial view setup
    if (registerForm) registerForm.style.display = 'block';
    if (loginForm) loginForm.style.display = 'none';
});
