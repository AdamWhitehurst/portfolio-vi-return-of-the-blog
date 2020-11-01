import React from 'react';
import { DateTime } from 'luxon';
import { PostTitle, PostDate } from './Labels';
import { Preview } from './Preview';
import { GroBtn } from './Inputs';

export function BlogItem({
  id, title, content, deleteItem, createdAt,
}) {
  return (
    <div id={id}>
      <PostTitle>{title}</PostTitle>
      <Preview mdInput={content} />
      <PostDate>
        {`- Posted: ${DateTime.fromISO(createdAt).toLocaleString(DateTime.DATETIME_FULL)}`}
      </PostDate>
      {deleteItem && <GroBtn onClick={deleteItem}> DELETE</GroBtn>}
    </div>
  );
}
