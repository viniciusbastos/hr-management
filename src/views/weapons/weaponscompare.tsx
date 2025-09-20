import React, { useState, useRef, ChangeEvent, useEffect } from 'react'
import Papa from 'papaparse'
import { useQuery } from '@tanstack/react-query'
import fetchWeapons from '../../services/fetchWeapons'
import { fetchUsers } from '../../services/fetchUsers'

// Define TypeScript interfaces for our data structures
interface CsvItem {
  id: string | number
  [key: string]: any // Allow for other fields
}

interface ApiItem {
  id: string | number
  [key: string]: any // Allow for other fields
}

interface ComparisonResult {
  added: CsvItem[]
  removed: ApiItem[]
  modified: {
    csvItem: CsvItem
    apiItem: ApiItem
    differences: string[]
  }[]
}

const CsvComparator: React.FC = () => {
  // State management
  const [csvData, setCsvData] = useState<CsvItem[]>([])
  const [apiData, setApiData] = useState<ApiItem[]>([])
  const [comparisonResult, setComparisonResult] =
    useState<ComparisonResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const {
    data: users,
    isLoading,
    isError,
    isFetching,
    status,
    refetch,
  } = useQuery(['user'], fetchUsers, {
    onSuccess: (data) => {
      // Handle the updated data if needed
      console.log('Data refetched:', users)
    },
  })
  console.log(users)
  // Mock API data - in a real app, this would be fetched from an actual endpoint
  const mockApiData: ApiItem[] = users

  // Handle file upload with improved error handling and validation
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      setError('No file selected')
      return
    }

    // Validate file type
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      setError('Please select a valid CSV file')
      return
    }

    setLoading(true)
    setError(null)
    setCsvData([])
    setComparisonResult(null)

    // Parse CSV file with improved error handling
    Papa.parse(file, {
      complete: (results) => {
        try {
          // Validate parsed data
          if (!results.data || !Array.isArray(results.data)) {
            throw new Error('Invalid CSV data format')
          }

          // Convert to array of objects
          const data = results.data as any[]

          // Skip empty rows and header row if it exists
          const validData = data.filter((row) =>
            Array.isArray(row)
              ? row.some((cell) => cell !== '')
              : Object.values(row).some((val) => val !== '')
          )

          let items: CsvItem[] = []

          // Handle CSV with headers (most common case)
          if (Array.isArray(validData[0]) && validData[0].length > 0) {
            const headers = validData[0] as string[]
            items = validData.slice(1).map((row, index) => {
              const obj: any = {}
              headers.forEach((header, colIndex) => {
                obj[header] = row[colIndex]
              })
              return obj
            })
          } else {
            // If no headers, assume all rows are data items
            items = validData as CsvItem[]
          }

          // Validate that we have at least one item with an ID
          if (items.length > 0 && items[0].id === undefined) {
            // If no IDs are found, warn user but proceed with processing
            console.warn('CSV data may not have proper ID fields')
          }

          setCsvData(items)

          // Set mock API data - in real app, this would come from an API call
          setApiData(mockApiData)
        } catch (err) {
          setError('Error parsing CSV file')
          console.error('CSV parsing error:', err)
        } finally {
          setLoading(false)
        }
      },
      error: (error) => {
        setError('Error reading CSV file')
        console.error('CSV reading error:', error)
        setLoading(false)
      },
      header: true, // Always parse with headers for better reliability
      skipEmptyLines: true, // Skip empty lines automatically
    })
  }

  // Compare CSV data with API data - optimized for better performance and clarity
  const compareData = () => {
    if (csvData.length === 0 || apiData.length === 0) {
      setError('CSV and API data must be loaded before comparison')
      return
    }

    const added: CsvItem[] = []
    const removed: ApiItem[] = []
    const modified: ComparisonResult['modified'] = []

    // Find added items (in CSV but not in API)
    const apiIds = new Set(apiData.map((item) => item.id))

    // Filter out items without IDs
    const csvItemsWithIds = csvData.filter(
      (item) => item.id !== undefined && item.id !== null && item.id !== ''
    )

    for (const csvItem of csvItemsWithIds) {
      const existsInApi = apiData.some((apiItem) => apiItem.id === csvItem.id)
      if (!existsInApi) {
        added.push(csvItem)
      }
    }

    // Find removed items (in API but not in CSV)
    const csvIds = new Set(csvItemsWithIds.map((item) => item.id))

    for (const apiItem of apiData) {
      const existsInCsv = csvItemsWithIds.some(
        (csvItem) => csvItem.id === apiItem.id
      )
      if (!existsInCsv) {
        removed.push(apiItem)
      }
    }

    // Find modified items (in both but with different values)
    for (const apiItem of apiData) {
      const csvItem = csvItemsWithIds.find((item) => item.id === apiItem.id)

      if (csvItem) {
        const differences: string[] = []

        // Compare all fields except ID
        for (const key in apiItem) {
          if (key !== 'id' && apiItem[key] !== csvItem[key]) {
            differences.push(`${key}: "${apiItem[key]}" vs "${csvItem[key]}"`)
          }
        }

        if (differences.length > 0) {
          modified.push({
            csvItem,
            apiItem,
            differences,
          })
        }
      }
    }

    setComparisonResult({ added, removed, modified })
  }

  // Trigger comparison when both data sets are loaded
  const handleCompare = () => {
    if (csvData.length > 0 && apiData.length > 0) {
      compareData()
    } else {
      setError('Please load CSV and API data first')
    }
  }

  // Reset all data
  const handleReset = () => {
    setCsvData([])
    setApiData([])
    setComparisonResult(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Reset error when new file is uploaded
  useEffect(() => {
    if (csvData.length > 0 || apiData.length > 0) {
      setError(null)
    }
  }, [csvData, apiData])

  return (
    <div className="csv-comparator">
      <h2>CSV vs API Data Comparator</h2>

      <div className="upload-section">
        <h3>Upload CSV File</h3>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          ref={fileInputRef}
          className="file-input"
        />

        {loading && <p className="loading">Processing CSV file...</p>}

        {error && <p className="error">Error: {error}</p>}
      </div>

      <div className="data-display">
        <h3>CSV Data</h3>
        {csvData.length > 0 ? (
          <div className="data-table">
            <table>
              <thead>
                <tr>
                  {Object.keys(csvData[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {csvData.map((item, index) => (
                  <tr key={index}>
                    {Object.values(item).map((value, i) => (
                      <td key={i}>{String(value)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="no-data">No CSV data loaded</p>
        )}
      </div>

      <div className="api-data-display">
        <h3>API Data</h3>
        {apiData.length > 0 ? (
          <div className="data-table">
            <table>
              <thead>
                <tr>
                  {Object.keys(apiData[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {apiData.map((item, index) => (
                  <tr key={index}>
                    {Object.values(item).map((value, i) => (
                      <td key={i}>{String(value)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="no-data">No API data loaded</p>
        )}
      </div>

      <div className="comparison-section">
        <button
          onClick={handleCompare}
          disabled={loading || csvData.length === 0 || apiData.length === 0}
        >
          Compare Data
        </button>

        <button onClick={handleReset} disabled={loading}>
          Reset
        </button>

        {comparisonResult && (
          <div className="results">
            <h3>Comparison Results</h3>

            {comparisonResult.added.length > 0 && (
              <div className="differences added">
                <h4>Added Items</h4>
                {comparisonResult.added.map((item, index) => (
                  <div key={index} className="difference-item">
                    <p>
                      <strong>ID:</strong> {item.id}
                    </p>
                    <pre className="json-output">
                      {JSON.stringify(item, null, 2)}
                    </pre>
                  </div>
                ))}
              </div>
            )}

            {comparisonResult.removed.length > 0 && (
              <div className="differences removed">
                <h4>Removed Items</h4>
                {comparisonResult.removed.map((item, index) => (
                  <div key={index} className="difference-item">
                    <p>
                      <strong>ID:</strong> {item.id}
                    </p>
                    <pre className="json-output">
                      {JSON.stringify(item, null, 2)}
                    </pre>
                  </div>
                ))}
              </div>
            )}

            {comparisonResult.modified.length > 0 && (
              <div className="differences modified">
                <h4>Modified Items</h4>
                {comparisonResult.modified.map((diff, index) => (
                  <div key={index} className="difference-item">
                    <p>
                      <strong>ID:</strong> {diff.csvItem.id}
                    </p>
                    <p>
                      <strong>Differences:</strong>
                    </p>
                    <ul className="differences-list">
                      {diff.differences.map((diffStr, i) => (
                        <li key={i}>{diffStr}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {comparisonResult.added.length === 0 &&
              comparisonResult.removed.length === 0 &&
              comparisonResult.modified.length === 0 && (
                <p className="no-differences">
                  No differences found between CSV and API data
                </p>
              )}
          </div>
        )}
      </div>
    </div>
  )
}

export default CsvComparator
