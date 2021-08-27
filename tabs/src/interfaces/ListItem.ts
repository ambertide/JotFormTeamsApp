export default interface ListItem {
  key?: string;
  header: string;
  content?: string;
  headerMedia?: any;
  media: any;
  onClick?: () => void;
}
