import React, { PureComponent } from 'react';

// components
import Shell from '../../components/shell';
import Meta from '../../components/meta';
import PostsList from '../../components/posts/list';
import Sidebar from '../../components/sidebar';
import Box from '../../components/box';

@Shell
export default class Home extends PureComponent {

  render() {

    return(<>

      <Meta />

      <Box>

        <PostsList
          id={'home'}
          filters={{
            variables: {
              sort_by: "sort_by_date",
              deleted: false,
              weaken: false
            }
          }}
          scrollLoad={true}
          />

        <Sidebar
          recommendPostsDom={(
            <PostsList
              id={'_home'}
              itemName="posts-item-title"
              filters={{
                variables: {
                  sort_by: "comment_count:-1,like_count:-1,sort_by_date:-1",
                  deleted: false,
                  weaken: false,
                  page_size: 10,
                  start_create_at: (new Date().getTime() - 1000 * 60 * 60 * 24 * 30)+''
                }
              }}
              />
          )}
          />
      </Box>

    </>)
  }

}
