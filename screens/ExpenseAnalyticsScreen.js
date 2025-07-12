import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { LineChart, PieChart, BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const ExpenseAnalyticsScreen = () => {
  const [summary, setSummary] = useState({
    total: 0,
    average: 0,
    reimbursed: 0,
    taxSavings: 0,
  });

  const [categoryData, setCategoryData] = useState([
    { name: 'Dental', amount: 300, color: 'gold', legendFontColor: '#fff', legendFontSize: 12 },
    { name: 'Vision', amount: 200, color: '#ffcc00', legendFontColor: '#fff', legendFontSize: 12 },
    { name: 'Co-Pay', amount: 100, color: '#ffd700', legendFontColor: '#fff', legendFontSize: 12 },
  ]);

  const [monthlyExpenses, setMonthlyExpenses] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [{ data: [400, 350, 500, 300], strokeWidth: 2 }],
  });

  const [statusData, setStatusData] = useState({
    labels: ['Pending', 'Approved', 'Reimbursed'],
    datasets: [{ data: [3, 5, 2] }],
  });

  useEffect(() => {
    const total = categoryData.reduce((sum, c) => sum + c.amount, 0);
    const avg = total / categoryData.length;
    const reimbursed = 200;
    const taxSavings = total * 0.15;
    setSummary({ total, average: avg, reimbursed, taxSavings });
  }, [categoryData]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      <Text style={styles.title}>Expense Analytics</Text>

      <View style={styles.summaryRow}>
        <SummaryCard label="Total Expenses" value={`$${summary.total.toFixed(2)}`} />
        <SummaryCard label="Avg Expense" value={`$${summary.average.toFixed(2)}`} />
        <SummaryCard label="Reimbursed" value={`$${summary.reimbursed.toFixed(2)}`} />
        <SummaryCard label="Tax Savings" value={`$${summary.taxSavings.toFixed(2)}`} />
      </View>

      <Text style={styles.chartTitle}>Expenses by Category</Text>
      <PieChart
        data={categoryData}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />

      <Text style={styles.chartTitle}>Monthly Expenses</Text>
      <LineChart
        data={monthlyExpenses}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        bezier
      />

      <Text style={styles.chartTitle}>Status Distribution</Text>
      <BarChart
        data={statusData}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        fromZero
        showValuesOnTopOfBars
      />
    </ScrollView>
  );
};

const SummaryCard = ({ label, value }) => (
  <View style={styles.summaryCard}>
    <Text style={styles.cardLabel}>{label}</Text>
    <Text style={styles.cardValue}>{value}</Text>
  </View>
);

const chartConfig = {
  backgroundGradientFrom: '#1c1c1c',
  backgroundGradientTo: '#1c1c1c',
  color: (opacity = 1) => `rgba(255, 215, 0, ${opacity})`,
  labelColor: () => '#fff',
  style: { borderRadius: 16 },
  propsForDots: { r: '5', strokeWidth: '2', stroke: '#ffa726' },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    padding: 16,
  },
  title: {
    fontSize: 30,
    color: '#fff',
    fontWeight: '900',
    marginBottom: 12,
    marginTop: 40,
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'gold',
    paddingBottom: 6,
    alignSelf: 'center',
  },
  chartTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  summaryCard: {
    backgroundColor: '#1c1c1c',
    width: '48%',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  cardLabel: {
    color: '#ccc',
    marginBottom: 4,
  },
  cardValue: {
    color: 'gold',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ExpenseAnalyticsScreen;
