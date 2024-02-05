import { useCallback, useState } from 'react';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';

const deriveStatus = (writeStatus: string, transactionStatus: string) => {
  if (writeStatus === 'loading' || transactionStatus === 'loading') return 'loading';
  if (writeStatus === 'error' || transactionStatus === 'error') return 'error';
  if (writeStatus === 'success' && transactionStatus === 'success') return 'success';

  return 'idle';
};

const createTransactionPromise = () => {
  let resolve: any;
  let reject: any;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
};

const useContractWriteFlow = (config: any, prepareValues?: any) => {
  const [transactionPromise, setTransactionPromise] = useState<any>(
    createTransactionPromise,
  );

  const {
    write,
    writeAsync,
    status: writeStatus,
    data,
    error: writeError,
  } = useContractWrite(config);

  const { status: transactionStatus, error: transactionError } = useWaitForTransaction({
    hash: data?.hash,
    onSettled: (res, error) => {
      console.log({ res });
      if (error) transactionPromise.reject(error);
      else transactionPromise.resolve(res);

      setTransactionPromise(createTransactionPromise());
    },
  });

  const status = deriveStatus(writeStatus, transactionStatus);
  const error = writeError?.message ?? transactionError?.message ?? undefined;

  const asyncWriteAndAwaitTransaction = useCallback(
    async (config?: any) => {
      await writeAsync(config);
      return transactionPromise.promise;
    },
    [transactionPromise, writeAsync],
  );

  return {
    status,
    write,
    writeAsync: asyncWriteAndAwaitTransaction,
    isLoading: status === 'loading',
    error,
    prepareValues,
  };
};

export const usePreparedContractWriteFlow = (_config: any) => {
  const { config, ...prepareValues } = usePrepareContractWrite(_config);
  return useContractWriteFlow(config, prepareValues);
};

export default useContractWriteFlow;
