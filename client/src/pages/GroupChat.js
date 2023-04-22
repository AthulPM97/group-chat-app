import { useParams } from "react-router-dom";
import AddMembersForm from "../components/groups/AddMembersForm";
import React, { useEffect, useState } from "react";
import GroupChatbox from "../components/chat/GroupChatbox";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { groupActions } from "../store/group-slice";

const GroupChat = () => {
  const params = useParams();
  const { groupId } = params;

  const [count, setCount] = useState(0);

  //store
  const token = useSelector((x) => x.auth.token);
  const dispatch = useDispatch();
  const groupMessages = useSelector((x) => x.group.myGroupMessages);

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_API_URL;

    axios
      .get(`${baseUrl}/groups/${groupId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        // console.log(response.data);
        dispatch(groupActions.setMyGroupMessages(response.data.messages));
      })
      .catch((err) => console.log(err));
    const intervalId = setInterval(() => {
      console.log("get data called");
      setCount(count + 1);
    }, 2000);
    return () => clearInterval(intervalId);
  }, [count]);
  return (
    <React.Fragment>
      <AddMembersForm groupId={groupId} />
      <GroupChatbox messages={groupMessages} groupId={groupId} />
    </React.Fragment>
  );
};

export default GroupChat;
