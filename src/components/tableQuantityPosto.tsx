import {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import config from "../utils/config";
import fetchEfetivo from "../services/fetchEfetivo";
import { useQuery } from "@tanstack/react-query";
import {
  List,
  ListItem,
  ListItemSuffix,
  Chip,
  Card,
} from "@material-tailwind/react";
import Loading from "./loading";

export default function ListQuantityPosto() {
  interface efetivo {
    id: string;
    posto: string;
    qtd: number;
  }
  const [efetivo, setEfetivo] = useState([]);
  const results = useQuery(["efetivo"], fetchEfetivo);
  if (results.isLoading) {
    return (
      <Loading />
    );
  }
  return (
    <Card className="mb-5 bg-white dark:bg-gray-700 rounded-xl shadow-xl">
      <List className="dark:text-gray-400">
        {results.data.map(
          (efetivo: {
            posto:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | null
              | undefined;
            qtd:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | null
              | undefined;
          }) => (
            <ListItem>
              {efetivo.posto}
              <ListItemSuffix>
                <Chip
                  value={efetivo.qtd}
                  variant="ghost"
                  size="sm"
                  className="rounded-full dark:bg-coolGray-300"
                />
              </ListItemSuffix>
            </ListItem>
          ),
        )}
      </List>
    </Card>
  );
}
