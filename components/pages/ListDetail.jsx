import Link from '../../components/Link';

import usePage from '../../hooks/usePage';
import Store from '../../store';
import * as actions from '../../store/actions';
import * as selectors from '../../store/selectors';

import Content from '../ui/Content';
import List from '../ui/List';
import VirtualScroll from '../ui/VirtualScroll';

const ListItems = ({ list }) => {
  return (
    <>
      <div className="py-2">
        <Link href="/lists">All Lists</Link>
      </div>
      <VirtualScroll
        data={list?.items || []}
        totalCount={(list?.items || []).length}
        style={{ height: '100%', width: '100%' }}
        itemContent={(i, item) => <ListItemEntry list={list} item={item} />}
      />
    </>
  );
};

const ListItemEntry = ({ list, item }) => (
  <div
    className="p-4 border-solid border-b cursor-pointer flex select-none"
    onClick={() => actions.setDone(list, item, !item.done)}
  >
    <span className="text-md flex-1">{item.name}</span>
    <input
      className="pointer-events-none select-none"
      type="checkbox"
      checked={item.done || false}
      readOnly={true}
    />
  </div>
);

const ListDetail = ({ selected, listId, params }) => {
  const lists = Store.useState(selectors.getLists);
  const actualListId = listId ? listId : params?.listId || null;
  const loadedList = lists.find(l => l.id === actualListId);

  usePage({
    title: loadedList.name,
  });

  return (
    <Content className="p-4">
      <List className="h-full w-full">
        <ListItems list={loadedList} />
      </List>
    </Content>
  );
};

export default ListDetail;
