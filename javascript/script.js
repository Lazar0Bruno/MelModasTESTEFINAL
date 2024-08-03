document.addEventListener("DOMContentLoaded", () => {
    let cartCount = 0;
    const cartCountElement = document.getElementById("cart-count");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const viewCartButton = document.getElementById("view-cart");
    const cartPanel = document.getElementById("cart-panel");
    const cartItemsContainer = document.getElementById("cart-items");
    const emptyCartMessage = document.getElementById("empty-cart-message");
    const payWithPixButton = document.getElementById("pay-with-pix");

    // Função para atualizar o contador do carrinho
    function updateCartCount() {
        cartCountElement.textContent = `Itens (${cartCount})`;
        if (cartCount === 0) {
            emptyCartMessage.style.display = "block";
            payWithPixButton.style.display = "none"; // Oculta o botão de pagamento
        }
    }

    // Adiciona um item ao carrinho
    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            cartCount++;
            updateCartCount();

            const product = button.closest(".product");
            const productName = product.getAttribute("data-product-name");
            const productPrice = product.getAttribute("data-product-price");
            const productImg = product.getAttribute("data-product-img");
            
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <img src="${productImg}" alt="${productName}">
                <div class="item-details">
                    <span>${productName}</span>
                    <span class="item-price">R$ ${productPrice}</span>
                </div>
                <button class="remove-item">Remover</button>
            `;

            cartItemsContainer.appendChild(cartItem);
            emptyCartMessage.style.display = "none";
            payWithPixButton.style.display = "block"; // Mostra o botão de pagamento

            // Adiciona uma animação para o item adicionado
            cartItem.classList.add("fade-in");
            setTimeout(() => {
                cartItem.classList.remove("fade-in");
            }, 300);
        });
    });

    // Abre o painel do carrinho
    viewCartButton.addEventListener("click", () => {
        cartPanel.style.display = "block";
        cartPanel.scrollIntoView({ behavior: "smooth" });
    });

    // Fecha o painel do carrinho ou remove itens
    cartPanel.addEventListener("click", (event) => {
        if (event.target.classList.contains("close-cart")) {
            cartPanel.style.display = "none";
        }
        if (event.target.classList.contains("remove-item")) {
            if (confirm("Tem certeza de que deseja remover este item?")) {
                const cartItem = event.target.closest(".cart-item");
                cartItem.remove();
                cartCount--;
                updateCartCount();
            }
        }
    });
});
