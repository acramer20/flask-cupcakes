const BASE_URL = "http://127.0.0.1:5000/api";



// with each cupcake generate the following html
function generateCupcakeHTML(cupcake) {
    return `
    <div data-cupcake-id=${cupcake.id}>
        <li>
            A ${cupcake.size} ${cupcake.flavor} cupcake with a rating of ${cupcake.rating}
        </li>
        <img class="Cupcake-img" src="${cupcake.image}" alt="Image of a ${cupcake.size} ${cupcake.flavor}">
    </div>
    `;
};

/** put existing cupcakes on the page */

async function showExistingCupcakes() {
    const response = await axios.get(`${BASE_URL}/cupcakes`);

    for (let cupcakeData of response.data.cupcakes) {
        let newCupcake = $(generateCupcakeHTML(cupcakeData));
        $(`#cupcake-list`).append(newCupcake);
    }
};

/**Adding a new cupcake */

$('#adding-cupcake').on('submit', async function(evt) {
    evt.preventDefault();
    let flavor = $('#form-flavor').val();
    let size = $('#form-size').val();
    let rating = $('#form-rating').val();
    let image = $('#form-image').val();

    const newCupcakeResp = await axios.post(`${BASE_URL}/cupcakes`, {
        flavor, 
        size,
        rating, 
        image
    });

    let newCupcake = $(generateCupcakeHTML(newCupcakeResp.data.cupcake));
    $('#cupcake-list').append(newCupcake);
    $('#adding-cupcake').trigger('reset');
})

$(showExistingCupcakes);