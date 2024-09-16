interface ApiResponse<T> {
  count: number;
  results: T[];
}

export default ApiResponse;
