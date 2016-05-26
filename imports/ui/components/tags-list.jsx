import React from 'react';
import Paper from 'material-ui/Paper';
import List from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import { Tag } from './tag.jsx';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { lightBlack } from 'material-ui/styles/colors';

export function TagsList(props) {
  return (
    <div>
      {props.tags.length > 0 ?
        <Paper>
          <List>
            {props.tags.map(tag =>
              <Tag
                name={tag.name}
                comments={tag.comments}
                icon={tag.icon ? tag.icon : null}
                color={tag.color ? tag.color : null}
                taskId={tag._id}
              />
            )}
          </List>
        </Paper>
        :
        <p style={{ textAlign: 'center' }}>
          <FontIcon className="material-icons">add</FontIcon>
          <br />
          <span>No tag added yet!</span>
        </p>
      }
      <FloatingActionButton
        secondary
        style={{ position: 'fixed', right: 20, bottom: 20 }}
        iconStyle={{ color: lightBlack }}
      >
        <FontIcon className="material-icons">add</FontIcon>
      </FloatingActionButton>
    </div>
  );
}

TagsList.propTypes = {
  tasks: React.PropTypes.array,
  tags: React.PropTypes.array,
};
