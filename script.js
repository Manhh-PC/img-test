// Mảng lưu trữ các sản phẩm
let products = [];

// Lấy các sản phẩm từ localStorage và hiển thị trên trang chủ
window.onload = function () {
    if (localStorage.getItem('products')) {
        products = JSON.parse(localStorage.getItem('products'));
    }

    displayProducts();
};

// Hàm hiển thị các sản phẩm lên trang chủ
function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Xóa danh sách cũ

    products.forEach((product, index) => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Giá: ${product.price} VND</p>
            <p>Số lượng: ${product.quantity}</p>
            <button class="delete-btn" onclick="deleteProduct(${index})">Xóa</button>
        `;
        productList.appendChild(productItem);
    });
}

// Hàm xóa sản phẩm
function deleteProduct(index) {
    // Xóa sản phẩm khỏi mảng
    products.splice(index, 1);

    // Lưu lại vào localStorage
    localStorage.setItem('products', JSON.stringify(products));

    // Hiển thị lại danh sách sản phẩm sau khi xóa
    displayProducts();
}

// Thêm sản phẩm mới
document.getElementById('add-product-form')?.addEventListener('submit', function (event) {
    event.preventDefault();

    const productName = document.getElementById('product-name').value;
    const productPrice = document.getElementById('product-price').value;
    const productQuantity = document.getElementById('product-quantity').value;
    const productImage = document.getElementById('product-image').files[0];

    if (productImage) {
        const reader = new FileReader();

        // Sau khi đọc xong ảnh
        reader.onloadend = function () {
            const newProduct = {
                name: productName,
                price: productPrice,
                quantity: productQuantity,
                image: reader.result // Lưu đường dẫn ảnh sau khi tải lên
            };

            // Thêm sản phẩm vào mảng
            products.push(newProduct);

            // Lưu lại vào localStorage
            localStorage.setItem('products', JSON.stringify(products));

            // Quay lại trang chủ
            window.location.href = 'index.html';
        };

        reader.readAsDataURL(productImage); // Đọc ảnh và chuyển thành Data URL
    } else {
        alert('Vui lòng chọn ảnh sản phẩm!');
    }
});
