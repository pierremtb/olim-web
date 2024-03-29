import React from 'react';
import { ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import { grey600, white } from 'material-ui/styles/colors';
import { avatarBackgroundColor } from '../utils/themes';
import { removeTag } from '../../api/tags/methods';

export class Tag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false,
    };
    this.deleteTag = this.deleteTag.bind(this);
  }

  deleteTag() {
    const { tagId } = this.props;
    removeTag.call({ _id: tagId });
  }

  render() {
    return (
      <ListItem
        onMouseEnter={() => this.setState({ hovered: true })}
        onMouseLeave={() => this.setState({ hovered: false })}
        leftAvatar={
          <Avatar
            backgroundColor={!this.props.color ? avatarBackgroundColor : this.props.color}
            color={white}
            icon={this.props.icon ?
              <FontIcon className="material-icons">{this.props.icon}</FontIcon>
            : null}
          >
            {!this.props.icon ? this.props.name.charAt(0).toUpperCase() : null}
          </Avatar>
        }
        primaryText={`#${this.props.name}`}
        secondaryText={this.props.comments}
      >
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 12,
          }}
        >
          <IconButton
            iconClassName="material-icons"
            tooltip="Delete"
            iconStyle={{ color: grey600 }}
            onTouchTap={this.props.onDeleteClick}
            style={{
              position: 'absolute',
              right: 0,
            }}
          >
            delete
          </IconButton>
          <IconButton
            iconClassName="material-icons"
            tooltip="Edit"
            onTouchTap={this.props.onEditClick}
            iconStyle={{ color: grey600 }}
            style={{
              position: 'absolute',
              right: 48,
            }}
          >
            edit
          </IconButton>
        </div>
      </ListItem>
    );
  }
}

Tag.propTypes = {
  name: React.PropTypes.string,
  comments: React.PropTypes.string,
  icon: React.PropTypes.string,
  color: React.PropTypes.string,
  tagId: React.PropTypes.string,
  onEditClick: React.PropTypes.func,
  onDeleteClick: React.PropTypes.func,
};
