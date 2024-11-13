let product = [];
let showAllResult = false;
let banner = {};
let productDetails = {};
const fatchData = async (query) => {
    try {
        const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${query}`);
        const data = await response.json();
        product = data.data;
        loading(true);
        document.getElementById('show').style.display = 'none';
        setTimeout(() => {
            product = data.data;
            productLoad();
        }, 1000);
    } catch (err) {
        console.log(err);
    }
}
const bannerProductDetails = async (slug) => {
    try {
        const response = await fetch(`https://openapi.programming-hero.com/api/phone/${slug}`);
        const data = await response.json();
        banner = data.data;
        console.log(banner);
        bannerData();
    } catch (err) {
        console.log(err);
    }
}

const bannerData = () => {
    const bannerPart = document.getElementById('banner');
    bannerPart.innerHTML = `
            <div class="row align-items-center">
                <div class="col-lg-6">
                    <div class="product-details">
                        <h1>${banner.name}</h1>
                        <p> There are many variations of passages of Lorem Ipsum available, but the majority have
                            suffered
                            alteration in some form, by injected humou. </p>
                        <button>Buy Now</button>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="product-img">
                        <img src="${banner.image}" alt="">
                    </div>
                </div>
            </div>
    `
}
fatchData('iphone');
bannerProductDetails('apple_iphone_13_pro_max-11089');


const searchValue = () => {
    const inputField = document.getElementById('searchQuery');
    const inputValue = inputField.value;
    if (inputValue === '') {
        inputField.style.border = '1px solid red';
    } else {
        loading(true);
        const products = document.getElementById('products');
        products.textContent = "";
        document.getElementById('show').style.display = 'none';
        fatchData(inputValue);
        const searchResult = document.getElementById('searchResult');
        if (inputValue !== '') {
            document.getElementById('searchResult-text').style.display = 'block';
            searchResult.innerText = inputValue;
        } else {
            document.getElementById('searchResult-text').style.display = 'none';
        }
        inputField.value = '';
    }
}
const productLoad = (showAllResult = false) => {
    const displayProduct = showAllResult ? product : product.slice(0, 8);

    document.getElementById('show').style.display = product.length < 9 || showAllResult ? 'none' : 'block';

    const products = document.getElementById('products');

    products.innerHTML = '';
    
    displayProduct.forEach((item) => {
        products.innerHTML += `
        <div class="col-lg-3">
            <div class="product">
                <div class="product-img mb-3">
                    <img src="${item.image}" alt="">
                </div>
                <div class="product-info">
                    <h2>${item.phone_name}</h2>
                    <p> There are many variations of passages of available, but the majority have suffered </p>
                    <div class="d-flex align-items-center justify-content-between">
                        <h2 class="price">$---</h2>
                        <button onclick="viewDetails('${item.slug}')">View Details</button>
                    </div>
                </div>
            </div>
        </div>
        `
    })
    loading(false);
}
const show = () => {
    productLoad(true);
}
const viewProductDetailsApi = (slug, show) => {
    const bannerProductDetails = async (slug) => {
        try {
            const response = await fetch(`https://openapi.programming-hero.com/api/phone/${slug}`);
            const data = await response.json();
            viewProductDetails = data.data;
            viewingProductDetails()
        } catch (err) {
            console.log(err);
        }
    }
    bannerProductDetails(slug);
    document.getElementById('modal').style.display = show ? 'block' : 'none';
}
const viewingProductDetails = () => {
    document.getElementById('product-view').innerHTML = `
         <div class="product-img mb-4">
                <img src="${viewProductDetails.image}" alt="">
            </div>
            <div class="product-info">
                <h2>${viewProductDetails.name}</h2>
                <p> There are many variations of passages of available, but the majority have
                    suffered
                </p>
                <div class="d-flex align-items-center gap-3 mb-2">
                    <h3 class="view-title">Storage :</h3>
                    <span class="tag">${viewProductDetails.mainFeatures.storage}</span>
                </div>
                <div class="d-flex align-items-center gap-3 mb-2">
                    <h3 class="view-title">USB :</h3>
                    <span class="tag">${viewProductDetails.others.USB}</span>
                </div>
                <div class="d-flex align-items-center gap-3 mb-2">
                    <h3 class="view-title">Memory :</h3>
                    <span class="tag">${viewProductDetails.mainFeatures.memory}</span>
                </div>
                <div class="d-flex align-items-center gap-3 mb-2">
                    <h3 class="view-title">Sensors :</h3>
                    <div>${viewProductDetails.mainFeatures.sensors.map(item => `<span class="tag">${item}</span>`).join(' ')}</div>
                </div>
                <div class="d-flex align-items-center gap-3 mb-2">
                    <h3 class="view-title">Display :</h3>
                    <span class="tag">${viewProductDetails.mainFeatures.displaySize}</span>
                </div>
            </div>
    `
}
const viewDetails = (slug) => {
    viewProductDetailsApi(slug, true)
}
const closeBtn = () => {
    viewProductDetailsApi('', false)
}
const loading = (isloader) => {
    const loader = document.getElementById('loader');
    if (isloader) {
        loader.style.display = 'block';
    } else {
        loader.style.display = 'none';
    }
}