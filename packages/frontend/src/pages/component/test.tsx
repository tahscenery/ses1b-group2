import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { gql, graphql } from 'react-apollo';

const columns = [{
  header: 'SKU',
  accessor: 'sku' // String-based value accessors!
}, {
  header: 'Location',
  accessor: 'location',
  sortable: true,
}, {
  header: 'Instance Type',
  accessor: 'instanceType'
}, {
  header: 'Operating System',
  accessor: 'operatingSystem'
}]


function ProductList({ loading, products }) {
  if (loading) {
    return <div>Loading</div>;
  } else {
    return (
      <div className="App">
        <ReactTable className="-striped -highlight"
          data={products}
          columns={columns}
        />
      </div>
    );
  }
}

const allProducts = gql`
query products {
  products{
    sku
    location
    instanceType
    operatingSystem
  }                                                                                                                                                                                                             
}`;

const ProductListWithData = graphql(allProducts, {
  props: ({data: { loading, products }}) => ({
    loading,
    products,
  }),
})(ProductList);

render() {
  return (
    <div className="App">
      <ApolloProvider client={this.client}>
        <ProductListWithData />
      </ApolloProvider>
    </div>
  );
}