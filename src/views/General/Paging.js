import React, { Component } from 'react';

class Paging extends Component{
    constructor(props){
        super(props)
        this.state = {
            totalRows : props.totalRows
        }
        // console.log(`constructor call`);
    }

    componentDidUpdate(){
        // console.log('component did update'+this.props.currentPage);
    }

    numberClickEvent = (e)=>{
        //console.log(e.currentTarget.textContent.trim());
        this.props.numberEventClick(e.currentTarget.textContent.trim());
    }

    createPageNumber = () => {
        let pageNumber = [];
        let totalPage = this.props.maxPage;

        for(let i=0; i < totalPage;i++){
            pageNumber.push( <button className="btn btn-link company-link p-0" key={i} onClick={this.numberClickEvent}> {i+1} </button> );
        }

        return pageNumber;
    }

    nextPageClick = () => {
        this.props.nextPageClick();
    }

    backPageClick = () => {
       this.props.backPageClick();
    }

    pageStartIndexOf = () => {
        return ((this.props.currentPage*this.props.displayPage)-this.props.displayPage)+1;
    }

    pageLastIndexOf = () => {
        if(this.props.totalRows < this.props.displayPage )
            return ((this.props.currentPage * this.props.displayPage)-this.props.displayPage)+1;
        else
            return (this.props.currentPage * this.props.displayPage);
    }

    render(){
        return(<div>
            <span>{this.pageStartIndexOf()}</span> - <span>{this.pageLastIndexOf()}</span> of <span>{this.props.totalRows}</span> list | 
            <button className="btn btn-link company-link p-0" onClick={this.backPageClick}><i className="fa fa-chevron-left" aria-hidden="true"></i> Back</button> 
             { this.createPageNumber() }  
            <button className="btn btn-link company-link p-0" onClick={this.nextPageClick}>Next <i className="fa fa-chevron-right" aria-hidden="true"></i></button>
        </div>);
    }
}

export default Paging;