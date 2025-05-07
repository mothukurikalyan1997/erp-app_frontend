import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  pages: {
    backgroundColor: '#E4E4E4',
    padding:'30px'
  },
  Head: {
    display:'flex',
    alignItems:'center',
    borderBottom:'1px solid black',
    justifyContent:'center',
    fontSize:'20',
    height:'30px'
  },
  invnum:{
    fontSize:'12',
    paddingLeft:'5px',
    height:"70px",
    justifyContent:'center',
    gap:'5px',
    marginTop:'5px',
    marginBottom:'10px'
  },
  address: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    padding:'5px',
    fontSize:'12',
    height:'150px',
    marginBottom:'10px'
  },

  table: {
    width: '100%',
    fontSize:'16',
    marginBottom: 20,
    border: '1px solid #ccc',
    borderCollapse: 'collapse'
    },
    tableHeader: {
      fontWeight: 'bold',
      width:'150px',
      backgroundColor:'#333',
      color:'white'
    },
  tableCell: {
    padding: 5,
    border: '1px solid #ccc',
    fontSize:'11',
    textAlign:'center',
    },
  total:{
    fontSize:'12',
    display:'flex',
    paddingRight:'15px',
    gap:'5px'
  },
  col1:{
    width:'12%'
  },
  col2:{
    width:'40%'
  }
  
});