
const App = React.createClass({
  
  getInitialState() {
    return {
      products: []
    }
  },

  addNewProduct(newProduct) {
    console.log('App newProduct: ',newProduct)
    const { products } = this.state;
    this.setState({
      products: [...products, newProduct]
    })

    console.log(products);
  },

  removeProduct(id) {

    console.log ('id in removeProduct: ', id)

    const {products} = this.state;

    this.setState({
      products: products.filter(product => product.id !== id)
    });

/*    let products = this.state.products.concat();
    products.splice(id,1);
    this.setState({ products })*/

  },

  render() {
    const { products } = this.state;
    return (
      <div className="container">
      <h1>Product List</h1>
      <NewProductForm addNewProduct={this.addNewProduct}/>
      <ProductTable products={products} removeProduct={this.removeProduct}/> 
      </div>
    )
  }
})

const ProductTable = props => {
  const {products, removeProduct} = props;

  return (
      <table className="table">
        <thead>
          <tr>
          <th>Name</th>
          <th>Price</th> 
          <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <button onClick={removeProduct.bind(null, product.id)} className="btn btn-sm btn-danger">X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
}


const NewProductForm = React.createClass({

    submitForm(e) {
      e.preventDefault();

      let {name, price} = this.refs;

      let product = {
        name: name.value,
        price: parseFloat(price.value),
        id: uuid()
      }

      this.props.addNewProduct(product);
    },


    render() {
      return (
      <form onSubmit={this.submitForm}>
        <div className="form-group">
          <label htmlFor="newName">Product Name:</label>
          <input ref="name" type="text" className="form-control" id="newName" required/>
        </div>
        <div className="form-group">
          <label htmlFor="newPrice">Price:</label>
          <input ref="price" type="number" className="form-control" id="newPrice" min="0" step="0.01" required/>
        </div>
        <button className="btn btn-default">Add</button>
      </form>
    )
  }
})


ReactDOM.render(
  <App/>,
  document.getElementById('root')
)