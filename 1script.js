document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');

    // Função para exibir o formulário de login e ocultar o de registro
    function showLoginForm() {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    }

    // Função para exibir o formulário de registro e ocultar o de login
    function showRegisterForm() {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }

    // Exibe o formulário de login ao carregar a página
    showLoginForm();

    // Adiciona o evento de clique ao link "Faça login aqui"
    loginLink.addEventListener('click', function(event) {
        event.preventDefault(); // Evita o comportamento padrão do link
        showLoginForm(); // Exibe o formulário de login
    });

    // Adiciona o evento de clique ao link "Registre-se aqui"
    registerLink.addEventListener('click', function(event) {
        event.preventDefault(); // Evita o comportamento padrão do link
        showRegisterForm(); // Exibe o formulário de registro
    });
});
