import seaborn as sns
import matplotlib.pyplot as plt

# Sample data
data = sns.load_dataset("flights")

# Line plot
sns.lineplot(x="year", y="passengers", data=data)

# Show plot
plt.show()
