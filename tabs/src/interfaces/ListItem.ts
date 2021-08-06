export default interface ListItem {
  key: string;
  header: string;
  headerMedia: any;
  media: any;
  onClick?: () => void;
}
