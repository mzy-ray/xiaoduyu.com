import React, { Component } from 'react';
import PropTypes from 'prop-types';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getCommentListByName } from '../../../reducers/comment';
import { loadCommentList } from '../../../actions/comment';

// components
import ListLoading from '../../list-loading';
import CommentItem from '../list-item';
import Pagination from '../../pagination';
import Paginationa from '../../paginationa';
import Loading from '../../ui/loading';


@connect(
  (state, props) => ({
    list: getCommentListByName(state, props.name)
  }),
  dispatch => ({
    loadCommentList: bindActionCreators(loadCommentList, dispatch)
  })
)
export default class CommentList extends Component {

  static propTypes = {
    // 列表名称
    name: PropTypes.string.isRequired,
    // 列表的筛选条件
    filters: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {};
    this.loadList = this.loadList.bind(this);
  }

  componentDidMount() {
    const { list } = this.props;
    if (!list.data || list.data.length == 0) this.loadList();
    // ArriveFooter.add(this.state.name, this.loadList)
  }

  componentWillUnmount() {
    // ArriveFooter.remove(this.state.name)
  }

  loadList(restart = false) {
    const { name, filters, loadCommentList } = this.props;
    loadCommentList({ name, filters, restart });
  }

  componentWillReceiveProps(props) {
    if (props.name != this.props.name) {
      const { loadCommentList } = this.props;
      loadCommentList({ name: props.name, filters: props.filters, restart: true });
    }
  }

  render () {

    const self = this;
    const { name, list } = this.props;
    const { data, loading, more, filters = {}, count } = list;

    // console.log(list);

    return (
      <div ref="dom">

        <div className="list-group">
          {data && data.map((comment)=>{
            return (<CommentItem comment={comment} key={comment._id} />)
          })}
        </div>

        {loading ? <Loading /> : null}

        <Paginationa
          count={count || 0}
          pageSize={filters.page_size || 0}
          pageNumber={filters.page_number || 0}
          onChoose={(e)=>{

            const { dom } = this.refs;
            $(window).scrollTop($(dom).offset().top - 100);
            self.props.filters.variables.page_number = e;
            self.loadList(true);



            // $(window).height();

            // console.log($(window).height());
            // console.log($(dom).offset().top);


            // $(window).scrollTop(100);




          }}
          />


      </div>
    )
  }
}
